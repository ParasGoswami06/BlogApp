import React,{useState,useEffect} from 'react'
import { Container,Postcards } from '../components/index'
import appwriteService from "../appwrite/config"

function AllPosts() {
    const [post,setPosts]=useState([])
    useEffect(()=>{
        appwriteService.getPosts([]).then((posts)=>{
            if(posts){
                setPosts(posts.documents)
            }
        })
    },[])
  return post!=0? (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {post.map((post)=>(
                    <div key={post.$id} className='p-2 w-1/4'>
                        <Postcards {...post}/>
                    </div>
                ))}
            </div>
        </Container>
    </div>
  ) : <div className='w-full py-8'>
        <Container>
            <h1 className='text-2xl font-bold'>No posts</h1></Container>
      </div>
}

export default AllPosts