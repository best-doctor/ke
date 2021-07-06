import React, { useEffect, useState } from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'

type TVerboseName = {
  name: string
  verbose: string
}

type TVerboseNames = {
  home: TVerboseName
  quotations: TVerboseName
  quotation: TVerboseName
  quotationsCreate: TVerboseName
}

type TPathRule = {
  self?: string
  left?: string
  link: string
  text: string
}

type TPathRules = {
  [key: string]: TPathRule
}

type TBreadcrumbElement = {
  href?: string
  title: string
}

const getPathRule = (rules: TPathRules, pathElement: string, leftPathElement: string | undefined): TPathRule => {
  let pathRule: TPathRule = { link: '#', text: 'error' }

  const pathRulesArray = Object.values(rules)
  for (let i = 0; i < pathRulesArray.length; i += 1) {
    const pr = pathRulesArray[i]
    if ((pr.left !== undefined && pr.left === leftPathElement) || (pr.self !== undefined && pr.self === pathElement)) {
      pathRule = pr
      break
    }
  }

  return pathRule
}

const getBreadcrumbs = (rules: TPathRules, pathname: string): TBreadcrumbElement[] => {
  let pathElements = pathname.split('/')
  if (pathElements[pathElements.length - 1] === '') {
    pathElements = pathElements.slice(0, pathElements.length - 1)
  }

  const breadCrumbElements: TBreadcrumbElement[] = []

  for (let i = 0; i < pathElements.length; i += 1) {
    const pathRule = getPathRule(rules, pathElements[i], i === 0 ? undefined : pathElements[i - 1])

    breadCrumbElements.push({
      href: pathRule.left === undefined ? pathRule.link : pathRule.link.replace('[id]', pathElements[i]),
      title: pathRule.text,
    })
  }

  return breadCrumbElements
}

const Breadcrumbs = ({ rules }: { rules: TPathRules }): JSX.Element => {
  const { pathname } = useLocation()
  const [breadcrumbData, setBreadcrumbData] = useState(getBreadcrumbs(rules, pathname))

  useEffect(() => {
    setBreadcrumbData(getBreadcrumbs(rules, pathname))
  }, [pathname, rules])

  return (
    <Breadcrumb separator="/">
      {breadcrumbData.map((bd) => (
        <BreadcrumbItem key={bd.title}>
          <BreadcrumbLink
            href={bd.href || '#'}
            style={{
              fontWeight: 'bold',
              color: '#3072C4',
            }}
          >
            {bd.title}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  )
}

export { Breadcrumbs, TVerboseNames, TPathRule, TPathRules, TBreadcrumbElement }
