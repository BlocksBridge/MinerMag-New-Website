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

export async function generatePostsSitepmap() {
  let allPosts: any[] = []
  let currPage = 1
  let shouldRun = true

  while (shouldRun) {
    let getPostsFromWordpress = await fetch(`${process.env.NEXT_PUBLIC_backend_url || 'https://theminermag.com'}/wp-json/wp/v2/posts?per_page=100&page=${currPage}`).then(res=>res.json())
    if (getPostsFromWordpress?.code !== undefined) {
      shouldRun = false
    } else {
      shouldRun = true
      currPage += 1
      allPosts = [...allPosts, ...getPostsFromWordpress]
    }

  }
  console.log(allPosts.length, currPage)
  return allPosts

}
