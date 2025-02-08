import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function NormaliseMinerMagData(minermagData) {
  let MinerMagData = minermagData.data[0]
  let header = MinerMagData.data_points[0]
  let finalData = {}
  header.forEach(i=>finalData[i]={})
  MinerMagData.data_points.slice(1, MinerMagData.data_points.length).forEach(i=> {
      i.forEach((item, index) => {
          if (index == 0) {} else {
          finalData[header[index]][i[0]] = item
          }
      })
  })

  return finalData
}