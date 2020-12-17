import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const AllLesons = (props) => {
    const lessons = props.data.allMarkdownRemark.nodes;

    return (
        <Layout location="">
            <SEO title="All topics" />
            {
                lessons.map((lesson, index) => {
                    return <section key={index}>
                        <Link to={lesson.fields.slug}><h1>{lesson.frontmatter.title}</h1></Link>
                        <p>{lesson.frontmatter.summary}</p>
                    </section>
                })
            }
        </Layout>
    )
}

export default AllLesons

export const query = graphql`
    query($courseType: String, $topicId: String){ 
        allMarkdownRemark(filter: {frontmatter: {courseType: {eq: $courseType}, topicId: {eq: $topicId}}}) {
            nodes {
                frontmatter {
                  thumbnail
                  summary
                  title
                  topicId
                  id
                  description
                  courseType
                }
                fields{
                    slug
                }
            }
        }
    }
`
