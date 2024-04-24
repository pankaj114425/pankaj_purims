'use client'
import Link from 'next/link';
import { useState } from 'react';

export default function AuthorByID() {
	const [input, setInput] = useState("");
	return (
		<div>
			<label>
				Enter Author's Scopus ID:
				<input type="text" value={input} onChange={(el) => setInput(el.target.value)} />
			</label>
			<br />
			<Link href={`/author/${input}`}>Load Details</Link>
		</div>
	);
}