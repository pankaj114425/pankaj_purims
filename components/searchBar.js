"use client";
import Button from "@/components/UI/Button";
import Link from "next/link";
// import { useRouter } from "next/nevigation";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";

export default function SearchBar({ urlParams, value = "" }) {
  let params = new URLSearchParams(urlParams);
  let [text, setText] = useState(value);
  const [debouncedValue, setDebouncedValue] = useState("");
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleSearchParams = useCallback(
    (debouncedValue) => {
      let params = new URLSearchParams(window.location.search);
      if (debouncedValue.length > 0) {
        params.set("s", debouncedValue);
      } else {
        params.delete("s");
      }
      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`);
      });
    },
    [pathname, router]
  );

  // EFFECT: Set Initial Params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const searchQuery = params.get("s") ?? "";
    setText(searchQuery);
  }, []);

  // EFFECT: Set Mounted

  useEffect(() => {
    if (debouncedValue.length > 0 && !mounted) {
      setMounted(true);
    }
  }, [debouncedValue, mounted]);

  // EFFECT: Debounce Input text
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(text);
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [text]);

  useEffect(() => {
    if (mounted) handleSearchParams(debouncedValue);
  }, [debouncedValue, handleSearchParams, mounted]);

  return (
    <div className="col-span-12">
      <div className="flex flex-row flex-nowrap justify-center gap-2">
        <input
          placeholder="Search"
          onChange={(e) => setText(e.target.value)}
          // onChange={handleChange}
          value={text}
          type="search"
          className="searchbar py-2 px-2 rounded-md grow"
        ></input>
        <Button
          component={Link}
          href={{
            href: ".",
            query: (params.set("s", text), params.toString()),
          }}
          variant="filled"
          type="submit"
        >
          Search
        </Button>
      </div>
    </div>
  );
}