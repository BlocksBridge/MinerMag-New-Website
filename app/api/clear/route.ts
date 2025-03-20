import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(request: Request) { 
    const getPosts = await fetch(`${process.env.NEXT_PUBLIC_backend_url}/wp-json/wp/v2/posts`, {
        cache: "no-cache",
        next: { tags: ["posts"] },
      }).then((res) => res.json());
      //console.log(getPosts[0].acf)
    await revalidateTag("tags");
    await revalidatePath('/', 'layout')
    return NextResponse.json({ message: "Cleared Cache" });
}