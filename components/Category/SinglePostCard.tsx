import Image from "next/image";
import Link from "next/link";

// function NewsArticleCards() {
//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-8">Latest News</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {articles.map((article) => (
//           <div
//             key={article.id}
//             className="bg-white rounded-lg shadow-md overflow-hidden">
//             <Image
//               src={article.imageUrl}
//               alt={article.title}
//               width={300}
//               height={200}
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-4">
//               <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-blue-500 rounded-full mb-2">
//                 {article.category}
//               </span>
//               <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
//               <p className="text-gray-600 mb-4">{article.excerpt}</p>
//               <div className="flex items-center text-sm text-gray-500">
//                 <svg
//                   className="w-4 h-4 mr-2"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg">
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
//                 </svg>
//                 {new Date(article.date).toLocaleDateString("en-US", {
//                   year: "numeric",
//                   month: "long",
//                   day: "numeric",
//                 })}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

export default function SinglePostCard({
  article,
  category,
}: {
  article: any;
  category: string;
}) {
  return (
    <Link href={article.link.split(".com")[1]}>
      <div
        key={article.id}
        className="bg-white rounded-lg shadow-md overflow-hidden">
        <Image
          src={article.acf.main_image}
          alt={article.title.rendered}
          width={300}
          height={200}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-blue-500 rounded-full mb-2">
            {category.toUpperCase()}
          </span>
          <h2
            className="text-xl font-semibold mb-2"
            dangerouslySetInnerHTML={{ __html: article.title.rendered }}></h2>
          <p className="text-gray-600 mb-4">{article.acf.sub_title}</p>
          <div className="flex items-center text-sm text-gray-500">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            {new Date(article.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
      </div>
    </Link>
  );
}
