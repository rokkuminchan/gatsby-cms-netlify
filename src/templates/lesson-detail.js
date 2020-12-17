import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

const LessonDetail = ({ data }) => {
    const lesson = data.markdownRemark

    return (
        <>
            <SEO
                title={lesson.frontmatter.title}
                description={lesson.frontmatter.description || lesson.excerpt}
            />
            <article
                className="blog-post"
                itemScope
                itemType="http://schema.org/Article"
            >
                <section
                    dangerouslySetInnerHTML={{ __html: lesson.html }}
                    itemProp="articleBody"
                />
            </article>
        </>
    )
}

export default LessonDetail
