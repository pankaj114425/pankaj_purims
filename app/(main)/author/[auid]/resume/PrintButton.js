"use client"

import Button from "@/components/UI/Button.js"

export default function PrintButton({children}) {
	const print = function() {
		document.getElementById("resume-iframe").contentWindow.print();
	}
	return <Button variant="filled" onClick={print}>{children}</Button>
}