import { RefObject, useEffect } from "react";

export default function useDidClickOutside<T extends HTMLElement | SVGElement>(
	cb: Function,
	refs: Array<RefObject<T>>
) {
	function handleClickOutside(event: any) {
		let clickedOutside = true;
		refs.forEach((ref) => {
			if (ref.current && ref.current.contains(event.target)) {
				clickedOutside = false;
			}
		});
		if (clickedOutside) cb(event);
	}

	return useEffect(() => {
		/**
		 * Alert if clicked on outside of element
		 */

		// Bind the event listener
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener("mousedown", handleClickOutside);
		};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [refs]);
}
