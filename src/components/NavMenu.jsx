import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

function NavMenu({ pages, current, onNavigate }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        if (!open) return;
        const onClick = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
        const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
        document.addEventListener("mousedown", onClick);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("mousedown", onClick);
            document.removeEventListener("keydown", onKey);
        };
    }, [open]);

    return (
        <div ref={ref} className="relative">
            <button
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                onClick={() => setOpen(!open)}
                className="flex items-center justify-center w-10 h-10 bg-ink text-white border border-solid border-white rounded-[8px] cursor-pointer"
            >
                {open ? <X size={20} /> : <Menu size={20} />}
            </button>

            {open && (
                <nav className="absolute right-0 top-12 min-w-48 bg-ink border border-solid border-white rounded-[12px] p-2 flex flex-col">
                    {pages.map((page) => (
                        <button
                            key={page.id}
                            onClick={() => { onNavigate(page.id); setOpen(false); }}
                            className={`text-left px-3 py-2 rounded-[8px] border-0 cursor-pointer ${page.id === current ? "bg-teal text-ink" : "bg-transparent text-white hover:bg-deep-teal"}`}
                        >
                            {page.label}
                        </button>
                    ))}
                </nav>
            )}
        </div>
    );
}

export default NavMenu;
