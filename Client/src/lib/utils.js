import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import animationData from '@/assets/lottie-json'
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export const colors = [
  "bg-[#ff2c57] text-[#ff006e] border-[1px] border-[#ff006e5a]",
  "bg-[#ff9e6b] text-[#ff6600] border-[1px] border-[#ff66006b]",
  "bg-[#6d96ea] text-[#2667ff] border-[1px] border-[#2667ff5a]",
  "bg-[#4cc9f0] text-[#4cc9f0] border-[1px] border-[#4cc9f06b]",
];

export const getColor = (contact) => {
  if (!contact || contact.color === undefined) {
    return colors[0];  // Default color if contact or color is undefined
  }
  const { color } = contact;
  if (color >= 0 && color < colors.length) {
    return colors[color];
  }
  return colors[0];  // Default if color is out of range
};



export const animationDefaultOptions = {

  loop:true,
  autoPaly:true,
  animationData 
}
