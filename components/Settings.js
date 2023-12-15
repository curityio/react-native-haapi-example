import React from 'react'

export default function Settings(props) {
    const { followRedirects, setFollowRedirects } = props

    return <div className="example-app-settings active">
        <h3 className="white">Settings</h3>
        <input type="checkbox" id="toggleFollowRedirects" checked={followRedirects} onChange={() => setFollowRedirects(!followRedirects)} />
        <label htmlFor="toggleFollowRedirects">Follow Redirects</label>
    </div>
}
