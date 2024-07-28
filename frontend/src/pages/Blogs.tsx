import React, { useEffect, useState } from 'react'
import '../App.css'
import axios from 'axios'

function Blogs() {
  // Define the Author interface
  interface Author {
    name: string;
  }

  // Define the Blog interface
  interface Blog {
    id: string;
    title: string;
    content: string;
    author: Author;
  }

  // Define an array of Blog objects
  type Blogs = Blog[];

  const [blog, setBlog] = useState<Blogs>([])

  useEffect(() => {
    axios.get("https://my-app.namansoni8874.workers.dev/api/v1/blog/bulk", {
      headers: {
        authorization: localStorage.getItem("token")
      }
    }).then((response) => { setBlog(response.data.blogs) })
  }, [])

  return (
    <>
      {blog.map((item, index) => { return <Card key={index} authorName={item.author.name} title={item.title} content={item.content} /> })}
    </>
  )

}
interface Cardtype {
  authorName: string,
  title: string,
  content: string
}
function Card({ authorName, title, content }: Cardtype) {
  function namefront(authorname: string): string {
    const newauthorname = authorname.split(" ")
    const concatname = newauthorname[0][0] + newauthorname[1][0]
    return concatname
  }
  function handleExtraContent(content: string) {
    if (content.length >= 17) {
      const newstring = content.split(' ')
      const newstring1 = newstring.slice(0, 16)
      const finalstring = newstring1.join(' ')
      return finalstring
    }
    else {
      return content
    }
  }
  return (
    <div className='card-main-div'>
      <div className='card-submain-div'>
        <div className='nav-div'>
          <div className='avatar-div'>{namefront(authorName || "anonymous")}</div>
          <div className='card-author-div'>{authorName || "anonymous"}</div>
        </div>
        <div className='card-title-div'>{title}</div>
        <div className='card-content-div'>{handleExtraContent(content)}</div>
        <div className='card-readmore-div'>Read more...</div>
        <div className='card-time-div'>{(content.length / 10) + "minutes..."}</div>
      </div>
    </div>

  )
}


export default Blogs;
