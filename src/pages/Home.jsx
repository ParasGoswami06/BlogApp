import React,{useEffect, useState} from 'react'
import appwriteService from '../appwrite/config'
import { Container,Postcards } from '../components/index'
import { useSelector } from 'react-redux'

function Home() {
    let id='';
    const [posts,setPosts]=useState([])
    const authStatus=useSelector((state)=>
        state.auth.status)
    const userName=useSelector((state)=>state.auth.userData)
    if(userName){
        id=userName.$id;
        console.log(id);
    }
    // const id=[];
    useEffect(()=>{
        appwriteService.getPosts(id).then((posts)=>{
            if(posts){
                setPosts(posts.documents)
            }
        })
    },[id])
    if (posts.length === 0){
        return (
            <div className='w-full py-8 pt-4 text-center'>
                <Container>
                    <div className='dlex flex-wrap'>
                        <div className='p-2 w-full'>
                            {authStatus ? <h1 className='text-2xl font-bold hover:text-gray-500'>
                               {userName.name} Please Add Posts
                            </h1> : <h1 className='text-2xl font-bold hover:text-gray-500'>
                                Login to read Posts
                            </h1>}
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    // When posts are available

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post)=>(
                        (post.userid == id)?
                        <div key={post.id} className='p-2 w-1/4'>
                            <Postcards {...post}/>                                
                        </div>
                        :""
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home