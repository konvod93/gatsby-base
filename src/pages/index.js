import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../components/index.module.css"


const IndexPage = ({ data }) => {
  
  const { nodes } = data.allMarkdownRemark;
  
  return (
    <Layout>
      <div className="posts">
        {nodes.map(post => {
          const { category, title, url, image } = post.frontmatter
          const img = getImage(image)
          return (
            <div key={post.id} className="post">
              <GatsbyImage image={img} alt={ title }  />
              <Link to={`/${category}/${url}`} >
                {title}
              </Link>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage

export const query = graphql`
query MainPage {
  allMarkdownRemark {
    nodes {
      frontmatter {
        category
        title
        url
        image {
          childImageSharp {
            gatsbyImageData(width: 200, formats: [AUTO, AVIF], placeholder: BLURRED)
          }
        }
      }
      id
    }
  }
}
`
