import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const HomeIndex = ({ data }) => {
  console.log(data)
  const courses = data.allMarkdownRemark.nodes;

  return (
    <Layout location="">
      <SEO title="All topics" />
      {
        courses.map((course, index) => {
          return <section key={index}>
            <Link to={`course/${course.frontmatter.title}`}><h1>{course.frontmatter.title}</h1></Link>
            <p>{course.frontmatter.summary}</p>
          </section>
        })
      }
    </Layout>
  )
}

export default HomeIndex

export const query = graphql`
  query($courseType: StringQueryOperatorInput = {eq: "course"}) {
    allMarkdownRemark(filter: {frontmatter: {courseType: $courseType}}) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          thumbnail
          summary
          title
          topicId
          id
          description
          courseType
        }
      }
    }
  }
`
