const base = {
  width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none',
  stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round',
  'aria-hidden': true,
}
export const SearchIcon = (p) => (<svg {...base} {...p}><circle cx="11" cy="11" r="7.5" /><path d="m20.5 20.5-4-4" /></svg>)
export const PlusIcon = (p) => (<svg {...base} {...p}><path d="M12 5v14M5 12h14" /></svg>)
export const CloseIcon = (p) => (<svg {...base} {...p}><path d="M6 6l12 12M18 6 6 18" /></svg>)
export const BackIcon = (p) => (<svg {...base} {...p}><path d="M19 12H5M11 6l-6 6 6 6" /></svg>)
export const ClockIcon = (p) => (<svg {...base} {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>)
export const CalendarIcon = (p) => (<svg {...base} {...p}><rect x="3.5" y="5" width="17" height="15.5" rx="2" /><path d="M3.5 10h17M8 3v4M16 3v4M8 14h2M12 14h2M8 17h2" /></svg>)
export const CheckIcon = (p) => (<svg {...base} {...p}><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>)
export const TrashIcon = (p) => (<svg {...base} {...p}><path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3" /></svg>)
export const EditIcon = (p) => (<svg {...base} {...p}><path d="M11 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" /><path d="M18.5 2.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4z" /></svg>)
export const ChevronLeft = (p) => (<svg {...base} {...p}><path d="m15 5-7 7 7 7" /></svg>)
export const ChevronRight = (p) => (<svg {...base} {...p}><path d="m9 5 7 7-7 7" /></svg>)
