import { useState, useEffect } from 'react'
import { groupBy, toPairs, maxBy, minBy } from 'lodash'
import moment from 'moment'
import Header from '../components/Header'
import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalBarSeries,
    VerticalGridLines,
    HorizontalGridLines,
    makeWidthFlexible,
} from 'react-vis'

const FlexibleXYPlot = makeWidthFlexible(XYPlot)

export default function Analytics() {
    const [auth, setAuth] = useState()
    const [input, setInput] = useState()
    const [types, setTypes] = useState()

    useEffect(() => {
        if (!auth) return
        fetch('https://ants-senior-design.herokuapp.com/analytics')
            .then((resp) => resp.json())
            .then((analytics) => {
                console.log(analytics)
                setTypes(groupBy(analytics, 'action'))
            })
    }, [auth])

    if (!auth)
        return (
            <div className="analytics-password">
                <input
                    className="input"
                    type="password"
                    onChange={(e) => setInput(e.target.value)}
                />
                <button
                    className="button purple"
                    onClick={() => setAuth(input === '401queens')}
                >
                    Submit
                </button>
            </div>
        )

    function mapDailyData(data, uniqBy) {
        const byDate = toPairs(
            groupBy(data, (d) => moment(d.timestamp).format('M/D'))
        )
        return byDate.map(([date, results]) => ({
            x: moment(date).valueOf(),
            y: results.length,
        }))
    }

    function mapPostData(data, uniqBy) {
        const byPost = toPairs(groupBy(data, 'postid'))
        return byPost.map(([post, results]) => ({ x: post, y: results.length }))
    }

    function mapOrgData(data, uniqBy) {
        const byOrg = toPairs(groupBy(data, 'orgid'))
        return byOrg.map(([org, results]) => ({ x: org, y: results.length }))
    }

    function mapUserData(data, uniqBy) {
        const byUser = toPairs(groupBy(data, 'userid'))
        return byUser.map(([user, results]) => ({ x: user, y: results.length }))
    }

    if (!types)
        return (
            <div className="loading">
                <p>LOADING...</p>
            </div>
        )

    return (
        <div className="analytics">
            <Header />
            <div className="page-body">
                <div className="section-header">
                    <h1>Contents</h1>
                </div>
                <a href="#signupsperday">Signups per Day</a>
                <a href="#loginsperday">Logins per Day</a>
                <a href="#followsperday">Follows per Day</a>
                <a href="#likesperday">Likes per Day</a>
                <a href="#likesperday">Likes per Day</a>
                <a href="#likesperpost">Likes per Post</a>
                <a href="#followsperorg">Follows per Org</a>
                <a href="#postsperorg">Posts per Org</a>
                <a href="#likesperuser">Likes per User</a>
                <a href="#followsperuser">Follows per User</a>
                <a href="#loginsperuser">Logins per User</a>

                <a className="section-header" id="signupsperday">
                    <h1>Signups per Day</h1>
                </a>
                <div className="card">
                    <FlexibleXYPlot
                        height={500}
                        margin={{ left: 120, right: 100, top: 50, bottom: 50 }}
                        xType="time"
                    >
                        <VerticalGridLines />
                        <HorizontalGridLines />
                        <XAxis
                            tickFormat={(value) => moment(value).format('M/D')}
                            tickTotal={7}
                        />
                        <YAxis
                            tickFormat={(value) =>
                                value === Math.round(value) ? value : ''
                            }
                        />
                        <VerticalBarSeries data={mapDailyData(types.signup)} />
                    </FlexibleXYPlot>
                </div>

                <div className="section-header" id="loginsperday">
                    <h1>Logins per Day</h1>
                </div>
                <div className="card">
                    <FlexibleXYPlot
                        height={500}
                        margin={{ left: 120, right: 100, top: 50, bottom: 50 }}
                        xType="time"
                    >
                        <VerticalGridLines />
                        <HorizontalGridLines />
                        <XAxis
                            tickFormat={(value) => moment(value).format('M/D')}
                            tickTotal={7}
                        />
                        <YAxis
                            tickFormat={(value) =>
                                value === Math.round(value) ? value : ''
                            }
                        />
                        <VerticalBarSeries data={mapDailyData(types.login)} />
                    </FlexibleXYPlot>
                </div>

                <div className="section-header" id="followsperday">
                    <h1>Follows per Day</h1>
                </div>
                <div className="card">
                    <FlexibleXYPlot
                        height={500}
                        margin={{ left: 120, right: 100, top: 50, bottom: 50 }}
                        xType="time"
                    >
                        <VerticalGridLines />
                        <HorizontalGridLines />
                        <XAxis
                            tickFormat={(value) => moment(value).format('M/D')}
                            tickTotal={7}
                        />
                        <YAxis
                            tickFormat={(value) =>
                                value === Math.round(value) ? value : ''
                            }
                        />
                        <VerticalBarSeries data={mapDailyData(types.follow)} />
                    </FlexibleXYPlot>
                </div>

                <div className="section-header" id="likesperday">
                    <h1>Likes per Day</h1>
                </div>
                <div className="card">
                    <FlexibleXYPlot
                        height={500}
                        margin={{ left: 120, right: 100, top: 50, bottom: 50 }}
                        xType="time"
                    >
                        <VerticalGridLines />
                        <HorizontalGridLines />
                        <XAxis
                            tickFormat={(value) => moment(value).format('M/D')}
                            tickTotal={7}
                        />
                        <YAxis
                            tickFormat={(value) =>
                                value === Math.round(value) ? value : ''
                            }
                        />
                        <VerticalBarSeries data={mapDailyData(types.like)} />
                    </FlexibleXYPlot>
                </div>

                <div className="section-header" id="likesperpost">
                    <h1>Likes per Post</h1>
                </div>
                <div className="card">
                    <FlexibleXYPlot
                        height={500}
                        margin={{ left: 120, right: 100, top: 50, bottom: 50 }}
                        xType="ordinal"
                    >
                        <VerticalGridLines />
                        <HorizontalGridLines />
                        <XAxis />
                        <YAxis
                            tickFormat={(value) =>
                                value === Math.round(value) ? value : ''
                            }
                        />
                        <VerticalBarSeries data={mapPostData(types.like)} />
                    </FlexibleXYPlot>
                </div>

                <div className="section-header" id="followsperorg">
                    <h1>Follows per Org</h1>
                </div>
                <div className="card">
                    <FlexibleXYPlot
                        height={500}
                        margin={{ left: 120, right: 100, top: 50, bottom: 50 }}
                        xType="ordinal"
                    >
                        <VerticalGridLines />
                        <HorizontalGridLines />
                        <XAxis />
                        <YAxis
                            tickFormat={(value) =>
                                value === Math.round(value) ? value : ''
                            }
                        />
                        <VerticalBarSeries data={mapOrgData(types.follow)} />
                    </FlexibleXYPlot>
                </div>

                <div className="section-header" id="postsperorg">
                    <h1>Posts per Org</h1>
                </div>
                <div className="card">
                    <FlexibleXYPlot
                        height={500}
                        margin={{ left: 120, right: 100, top: 50, bottom: 50 }}
                        xType="ordinal"
                    >
                        <VerticalGridLines />
                        <HorizontalGridLines />
                        <XAxis />
                        <YAxis
                            tickFormat={(value) =>
                                value === Math.round(value) ? value : ''
                            }
                        />
                        <VerticalBarSeries data={mapUserData(types.post)} />
                    </FlexibleXYPlot>
                </div>

                <div className="section-header" id="likesperuser">
                    <h1>Likes per User</h1>
                </div>
                <div className="card">
                    <FlexibleXYPlot
                        height={500}
                        margin={{ left: 120, right: 100, top: 50, bottom: 50 }}
                        xType="ordinal"
                    >
                        <VerticalGridLines />
                        <HorizontalGridLines />
                        <XAxis />
                        <YAxis
                            tickFormat={(value) =>
                                value === Math.round(value) ? value : ''
                            }
                        />
                        <VerticalBarSeries data={mapUserData(types.like)} />
                    </FlexibleXYPlot>
                </div>

                <div className="section-header" id="followsperuser">
                    <h1>Follows per User</h1>
                </div>
                <div className="card">
                    <FlexibleXYPlot
                        height={500}
                        margin={{ left: 120, right: 100, top: 50, bottom: 50 }}
                        xType="ordinal"
                    >
                        <VerticalGridLines />
                        <HorizontalGridLines />
                        <XAxis />
                        <YAxis
                            tickFormat={(value) =>
                                value === Math.round(value) ? value : ''
                            }
                        />
                        <VerticalBarSeries data={mapUserData(types.follow)} />
                    </FlexibleXYPlot>
                </div>

                <div className="section-header" id="loginsperuser">
                    <h1>Logins per User</h1>
                </div>
                <div className="card">
                    <FlexibleXYPlot
                        height={500}
                        margin={{ left: 120, right: 100, top: 50, bottom: 50 }}
                        xType="ordinal"
                    >
                        <VerticalGridLines />
                        <HorizontalGridLines />
                        <XAxis />
                        <YAxis
                            tickFormat={(value) =>
                                value === Math.round(value) ? value : ''
                            }
                        />
                        <VerticalBarSeries data={mapUserData(types.login)} />
                    </FlexibleXYPlot>
                </div>
            </div>
        </div>
    )
}
