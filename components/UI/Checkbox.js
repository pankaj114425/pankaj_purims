"use client";
import { useEffect, useRef, useState } from "react";

export default function Checkbox({ checked = true, ...props }) {
	let element = useRef(null);
	useEffect(() => {
		if (element != null) {
			if (checked == null) {
				element.current.indeterminate = true;
				element.current.checked = false;
				return;
			} else element.current.indeterminate = false;
			if (checked) {
				element.current.checked = true;
			} else element.current.checked = false;
		}
	}, [checked]);
	return <input type="checkbox" ref={element} {...props} />;
}
