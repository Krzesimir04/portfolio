import { createProfilePage } from "./card.js";
import {createBlogView} from './blog.js'
// check the URL and display the correct page
document.addEventListener('DOMContentLoaded',()=>{
    let firstLoadProfile = true
    let firstLoadBlog = true
    const profilePage = document.querySelector("#index_page")
    const blogPage = document.querySelector("#blog_page")

    document.querySelectorAll('a').forEach(function(aTag){
        aTag.addEventListener('click',function(e){
            e.preventDefault()
            history.pushState({page:1},'title',this.href)
            // add the scroll effect

            // manage the page content
            if(this.href.includes('blog') && profilePage.style.display !== 'none' ){
                profilePage.style.display = 'none'
                blogPage.style.display = 'grid'
                if(firstLoadBlog){
                    firstLoadBlog = false
                    createBlogView()
                }
            }else if(!this.href.includes('blog') && profilePage.style.display === 'none'){
                profilePage.style.display = 'block'
                blogPage.style.display = 'none'
                if(firstLoadProfile){
                    firstLoadProfile = false
                    createProfilePage()
                }
            }
            document?.querySelector(`#${this.dataset.elemid}`) ?
            document.querySelector(`#${this.dataset.elemid}`).scrollIntoView() : document.querySelector(`header`).scrollIntoView()
        })
    })
    if(window.location.href.includes('blog')){
        profilePage.style.display = 'none'
        blogPage.style.display = 'grid'
        firstLoadBlog = false
        createBlogView()
    }else{
        profilePage.style.display = 'block'
        blogPage.style.display = 'none'
        firstLoadProfile = false
        createProfilePage()
    }
})