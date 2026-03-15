import React from "react"
import { uploadedImageURL } from "@fider/services"
import { useFider } from "@fider/hooks"
import { Tenant } from "@fider/models"
import "./Logo.scss"

type Size = 24 | 50 | 100 | 200

interface TenantLogoProps {
  size: Size
  useFiderIfEmpty?: boolean
}

const defaultBrandAlt = "InfoSight"

const DefaultBrandMark = ({ size }: { size: Size }) => {
  return (
    <span className="c-brand-logo c-brand-logo--mark" role="img" aria-label={defaultBrandAlt} style={{ width: size, height: size }}>
      <img className="c-brand-logo__mark" src="/static/tradeline-mark.svg" alt="" height={size} width={size} />
    </span>
  )
}

const DefaultBrandWordmark = ({ size }: { size: Size }) => {
  const height = Math.max(20, Math.round(size * 0.34))

  return (
    <span className="c-brand-logo c-brand-logo--wordmark" role="img" aria-label={defaultBrandAlt} style={{ height }}>
      <img className="c-brand-logo__asset c-brand-logo__asset--light" src="/static/logo-dark.svg" alt="" />
      <img className="c-brand-logo__asset c-brand-logo__asset--dark" src="/static/logo-light.svg" alt="" />
    </span>
  )
}

const DefaultBrandLogo = ({ size }: { size: Size }) => {
  if (size <= 50) {
    return <DefaultBrandMark size={size} />
  }

  return <DefaultBrandWordmark size={size} />
}

export const TenantLogoURL = (tenant: Tenant, size: Size): string | undefined => {
  if (tenant && tenant.logoBlobKey) {
    return uploadedImageURL(tenant.logoBlobKey, size)
  }
  return undefined
}

export const TenantLogo = ({ size, useFiderIfEmpty = false }: TenantLogoProps) => {
  const fider = useFider()

  const tenant = fider.session.tenant
  if (tenant && tenant.logoBlobKey) {
    return <img src={TenantLogoURL(fider.session.tenant, size)} alt={tenant.name} height={size} />
  } else if (useFiderIfEmpty) {
    return <DefaultBrandLogo size={size} />
  }
  return null
}

interface OAuthProviderLogoProps {
  option: {
    provider?: string
    displayName: string
    logoBlobKey?: string
  }
}

const systemProvidersLogo: { [key: string]: string } = {
  google: `data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS8vRU4nPjxzdmcgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgNDAwIDQwMCIgaGVpZ2h0PSI0MDBweCIgaWQ9IkxheWVyXzEiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDQwMCA0MDAiIHdpZHRoPSI0MDBweCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGc+PHBhdGggZD0iTTE0Mi45LDI0LjJDOTcuNiwzOS43LDU5LDczLjYsMzcuNSwxMTYuNWMtNy41LDE0LjgtMTIuOSwzMC41LTE2LjIsNDYuOGMtOC4yLDQwLjQtMi41LDgzLjUsMTYuMSwxMjAuMyAgIGMxMi4xLDI0LDI5LjUsNDUuNCw1MC41LDYyLjFjMTkuOSwxNS44LDQzLDI3LjYsNjcuNiwzNC4xYzMxLDguMyw2NCw4LjEsOTUuMiwxYzI4LjItNi41LDU0LjktMjAsNzYuMi0zOS42ICAgYzIyLjUtMjAuNywzOC42LTQ3LjksNDcuMS03Ny4yYzkuMy0zMS45LDEwLjUtNjYsNC43LTk4LjhjLTU4LjMsMC0xMTYuNywwLTE3NSwwYzAsMjQuMiwwLDQ4LjQsMCw3Mi42YzMzLjgsMCw2Ny42LDAsMTAxLjQsMCAgIGMtMy45LDIzLjItMTcuNyw0NC40LTM3LjIsNTcuNWMtMTIuMyw4LjMtMjYuNCwxMy42LTQxLDE2LjJjLTE0LjYsMi41LTI5LjgsMi44LTQ0LjQtMC4xYy0xNC45LTMtMjktOS4yLTQxLjQtMTcuOSAgIGMtMTkuOC0xMy45LTM0LjktMzQuMi00Mi42LTU3LjFjLTcuOS0yMy4zLTgtNDkuMiwwLTcyLjRjNS42LTE2LjQsMTQuOC0zMS41LDI3LTQzLjljMTUtMTUuNCwzNC41LTI2LjQsNTUuNi0zMC45ICAgYzE4LTMuOCwzNy0zLjEsNTQuNiwyLjJjMTUsNC41LDI4LjgsMTIuOCw0MC4xLDIzLjZjMTEuNC0xMS40LDIyLjgtMjIuOCwzNC4yLTM0LjJjNi02LjEsMTIuMy0xMiwxOC4xLTE4LjMgICBjLTE3LjMtMTYtMzcuNy0yOC45LTU5LjktMzcuMUMyMjguMiwxMC42LDE4My4yLDEwLjMsMTQyLjksMjQuMnoiIGZpbGw9IiNGRkZGRkYiLz48Zz48cGF0aCBkPSJNMTQyLjksMjQuMmM0MC4yLTEzLjksODUuMy0xMy42LDEyNS4zLDEuMWMyMi4yLDguMiw0Mi41LDIxLDU5LjksMzcuMWMtNS44LDYuMy0xMi4xLDEyLjItMTguMSwxOC4zICAgYy0xMS40LDExLjQtMjIuOCwyMi44LTM0LjIsMzQuMmMtMTEuMy0xMC44LTI1LjEtMTktNDAuMS0yMy42Yy0xNy42LTUuMy0zNi42LTYuMS01NC42LTIuMmMtMjEsNC41LTQwLjUsMTUuNS01NS42LDMwLjkgICAgYy0xMi4yLDEyLjMtMjEuNCwyNy41LTI3LDQzLjljLTIwLjMtMTUuOC00MC42LTMxLjUtNjEtNDcuM0M1OSw3My42LDk3LjYsMzkuNywxNDIuOSwyNC4yeiIgZmlsbD0iI0VBNDMzNSIvPjwvZz48Zz48cGF0aCBkPSJNMjEuNCwxNjMuMmMzLjMtMTYuMiw4LjctMzIsMTYuMi00Ni44YzIwLjMsMTUuOCw0MC42LDMxLjUsNjEsNDcuM2MtOCwyMy4zLTgsNDkuMiwwLDcyLjQgICAgYy0yMC4zLDE1LjgtNDAuNiwzMS42LTYwLjksNDcuM0MxOC45LDI0Ni43LDEzLjIsMjAzLjYsMjEuNCwxNjMuMnoiIGZpbGw9IiNGQkJDMDUiLz48L2c+PGc+PHBhdGggZD0iTTIwMy43LDE2NS4xYzU4LjMsMCwxMTYuNywwLDE3NSwwYzUuOCwzMi43LDQuNSw2Ni44LTQuNyw5OC44Yy04LjUsMjkuMy0yNC42LDU2LjUtNDcuMSw3Ny4yICAgIGMtMTkuNy0xNS4zLTM5LjQtMzAuNi01OS4xLTQ1LjljMTkuNS0xMy4xLDMzLjMtMzQuMywzNy4yLTU3LjVjLTMzLjgsMC02Ny42LDAtMTAxLjQsMEMyMDMuNywyMTMuNSwyMDMuNywxODkuMywyMDMuNywxNjUuMXoiIGZpbGw9IiM0Mjg1RjQiLz48L2c+PGc+PHBhdGggZD0iTTM3LjUsMjgzLjVjMjAuMy0xNS43LDQwLjYtMzEuNSw2MC45LTQ3LjNjNy44LDIyLjksMjIuOCw0My4yLDQyLjYsNTcuMWMxMi40LDguNywyNi42LDE0LjksNDEuNCwxNy45ICAgIGMxNC42LDMsMjkuNywyLjYsNDQuNCwwLjFjMTQuNi0yLjYsMjguNy03LjksNDEtMTYuMmMxOS43LDE1LjMsMzkuNCwzMC42LDU5LjEsNDUuOWMtMjEuMywxOS43LTQ4LDMzLjEtNzYuMiwzOS42ICAgIGMtMzEuMiw3LjEtNjQuMiw3LjMtOTUuMi0xYy0yNC42LTYuNS00Ny43LTE4LjItNjcuNi0zNC4xQzY3LDMyOC45LDQ5LjYsMzA3LjUsMzcuNSwyODMuNXoiIGZpbGw9IiMzNEE4NTMiLz48L2c+PC9nPjwvc3ZnPg==`,
  facebook: `data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMC8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvVFIvMjAwMS9SRUMtU1ZHLTIwMDEwOTA0L0RURC9zdmcxMC5kdGQnPjxzdmcgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMzIgMzIiIGhlaWdodD0iMzJweCIgaWQ9IkxheWVyXzEiIHZlcnNpb249IjEuMCIgdmlld0JveD0iMCAwIDMyIDMyIiB3aWR0aD0iMzJweCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGc+PHBhdGggZD0iTTMyLDMwYzAsMS4xMDQtMC44OTYsMi0yLDJIMmMtMS4xMDQsMC0yLTAuODk2LTItMlYyYzAtMS4xMDQsMC44OTYtMiwyLTJoMjhjMS4xMDQsMCwyLDAuODk2LDIsMlYzMHoiIGZpbGw9IiMzQjU5OTgiLz48cGF0aCBkPSJNMjIsMzJWMjBoNGwxLTVoLTV2LTJjMC0yLDEuMDAyLTMsMy0zaDJWNWMtMSwwLTIuMjQsMC00LDBjLTMuNjc1LDAtNiwyLjg4MS02LDd2M2gtNHY1aDR2MTJIMjJ6IiBmaWxsPSIjRkZGRkZGIiBpZD0iZiIvPjwvZz48Zy8+PGcvPjxnLz48Zy8+PGcvPjxnLz48L3N2Zz4=`,
  github:
    "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMC8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvVFIvMjAwMS9SRUMtU1ZHLTIwMDEwOTA0L0RURC9zdmcxMC5kdGQnPjxzdmcgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMzIgMzIiIGhlaWdodD0iMzJweCIgaWQ9IkxheWVyXzEiIHZlcnNpb249IjEuMCIgdmlld0JveD0iMCAwIDMyIDMyIiB3aWR0aD0iMzJweCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PHBhdGggY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTYuMDAzLDBDNy4xNywwLDAuMDA4LDcuMTYyLDAuMDA4LDE1Ljk5NyAgYzAsNy4wNjcsNC41ODIsMTMuMDYzLDEwLjk0LDE1LjE3OWMwLjgsMC4xNDYsMS4wNTItMC4zMjgsMS4wNTItMC43NTJjMC0wLjM4LDAuMDA4LTEuNDQyLDAtMi43NzcgIGMtNC40NDksMC45NjctNS4zNzEtMi4xMDctNS4zNzEtMi4xMDdjLTAuNzI3LTEuODQ4LTEuNzc1LTIuMzQtMS43NzUtMi4zNGMtMS40NTItMC45OTIsMC4xMDktMC45NzMsMC4xMDktMC45NzMgIGMxLjYwNSwwLjExMywyLjQ1MSwxLjY0OSwyLjQ1MSwxLjY0OWMxLjQyNywyLjQ0MywzLjc0MywxLjczNyw0LjY1NCwxLjMyOWMwLjE0Ni0xLjAzNCwwLjU2LTEuNzM5LDEuMDE3LTIuMTM5ICBjLTMuNTUyLTAuNDA0LTcuMjg2LTEuNzc2LTcuMjg2LTcuOTA2YzAtMS43NDcsMC42MjMtMy4xNzQsMS42NDYtNC4yOTJDNy4yOCwxMC40NjQsNi43Myw4LjgzNyw3LjYwMiw2LjYzNCAgYzAsMCwxLjM0My0wLjQzLDQuMzk4LDEuNjQxYzEuMjc2LTAuMzU1LDIuNjQ1LTAuNTMyLDQuMDA1LTAuNTM4YzEuMzU5LDAuMDA2LDIuNzI3LDAuMTgzLDQuMDA1LDAuNTM4ICBjMy4wNTUtMi4wNyw0LjM5Ni0xLjY0MSw0LjM5Ni0xLjY0MWMwLjg3MiwyLjIwMywwLjMyMywzLjgzLDAuMTU5LDQuMjM0YzEuMDIzLDEuMTE4LDEuNjQ0LDIuNTQ1LDEuNjQ0LDQuMjkyICBjMCw2LjE0Ni0zLjc0LDcuNDk4LTcuMzA0LDcuODkzQzE5LjQ3OSwyMy41NDgsMjAsMjQuNTA4LDIwLDI2YzAsMiwwLDMuOTAyLDAsNC40MjhjMCwwLjQyOCwwLjI1OCwwLjkwMSwxLjA3LDAuNzQ2ICBDMjcuNDIyLDI5LjA1NSwzMiwyMy4wNjIsMzIsMTUuOTk3QzMyLDcuMTYyLDI0LjgzOCwwLDE2LjAwMywweiIgZmlsbD0iIzE4MTYxNiIgZmlsbC1ydWxlPSJldmVub2RkIi8+PGcvPjxnLz48Zy8+PGcvPjxnLz48Zy8+PC9zdmc+",
}

export const OAuthProviderLogoURL = (logoBlobKey?: string): string | undefined => {
  if (logoBlobKey) {
    return uploadedImageURL(logoBlobKey, 100)
  }
  return undefined
}

export const OAuthProviderLogo = (props: OAuthProviderLogoProps) => {
  if (props.option.logoBlobKey) {
    return <img src={OAuthProviderLogoURL(props.option.logoBlobKey)} alt={props.option.displayName} />
  }

  if (props.option.provider && props.option.provider in systemProvidersLogo) {
    return <img src={systemProvidersLogo[props.option.provider]} alt={props.option.displayName} />
  }

  return null
}
