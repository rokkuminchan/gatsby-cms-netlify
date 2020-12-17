const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Get all markdown blog posts sorted by date
  const result = await graphql(`
    {
      allMarkdownRemark {
        nodes {
          frontmatter {
            id
            courseType
            topicId
            thumbnail
            summary
            title
          }
          fields {
            slug
          }
        }
      }
    }
    `)

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  const results = result.data.allMarkdownRemark.nodes

  console.log(results);

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (results.length > 0) {
    createAllLessonPages(results, createPage);
    // createLessonPages(results, graphql, createPage);
  }
}

// exports.onCreateNode = ({ node, actions, getNode }) => {
//   const { createNodeField } = actions

//   if (node.internal.type === `MarkdownRemark`) {
//     const value = createFilePath({ node, getNode })

//     createNodeField({
//       name: `slug`,
//       node,
//       value,
//     })
//   }
// }

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
    }
  `)
}

function normalize(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ").join("-");
}

function createLessonPages(data, createPage) {
  const lessonDetailTemplate = path.resolve(`./src/templates/lesson-detail.js`)

  const courses = data.filter(node => node.frontmatter.courseType === "course");
  const lessons = data.filter(node => node.frontmatter.courseType === "lesson");

  lessons.forEach((lesson, index) => {
    const course = courses.find(c => c.frontmatter.id === lesson.frontmatter.topicId);
    console.log(course);
    const previousLessonId = index === 0 ? null : lessons[index - 1].frontmatter.id;
    const nextLessonId = index === lessons.length - 1 ? null : lessons[index + 1].frontmatter.id;

    createPage({
      path: `/course/${normalize(course.frontmatter.title)}/lesson/${normalize(lesson.frontmatter.title)}`,
      component: lessonDetailTemplate,
      context: {
        id: lesson.frontmatter.id,
        previousPostId: previousLessonId,
        nextPostId: nextLessonId,
      },
    })
  })
}

function createAllLessonPages(data, createPage) {
  const allLessonTemplate = path.resolve(`./src/templates/all-lessons.js`);
  const courses = data.filter(node => node.frontmatter.courseType === "course");

  console.log(courses);

  courses.forEach(course => {
    createPage({
      path: `/course/${normalize(course.frontmatter.title)}`,
      component: allLessonTemplate,
      context: {
        courseType: "lesson",
        topicId: course.frontmatter.id
      },
    })
  });
}