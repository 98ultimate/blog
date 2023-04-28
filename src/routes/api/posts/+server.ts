import { json } from "@sveltejs/kit"

async function getPosts() {
    let posts = []

    const paths =import.meta.glob('/src/posts/*md', {
        eager: true
    })

    for (const path in paths) {
        const file = paths[path]
        const slug = path.split('/').at(-1)?.replace('.md','')
        const metaData = file.metadata
        const post = { ...metaData, slug }
        post.published && posts.push(post)
        console.log(slug)
    }

    posts = posts.sort((first, second) =>
        new Date(second.date).getTime() - new Date(first.date).getTime()
    )

    return posts
} 

export async function GET() {
    const posts = await getPosts()
    return json(posts)
}