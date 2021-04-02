import { useState, useEffect, useContext } from 'react'
import { groupBy, toPairs, maxBy, minBy } from 'lodash'
import { UserContext } from '../../contexts/user-context'
import moment from 'moment'
import Header from '../../components/Header'
import { useRouter } from 'next/router'

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
    const { user, userType } = useContext(UserContext)
    const [types, setTypes] = useState()
    const router = useRouter()

    //get org
    useEffect(() => {
        //get id from url
        if (!user || !user._id || router.query.id == undefined) return
        if (userType == 'user' || user._id !== router.query.id)
            router.replace('/')
        fetch('https://ants-senior-design.herokuapp.com/analytics/' + user._id)
            .then((resp) => resp.json())
            .then((analytics) => {
                setTypes(groupBy(analytics, 'action'))
            })
    }, [router, user])

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
        return byPost.map(([post, results]) => ({
            x: results[0].title,
            y: results.length,
        }))
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
                <p className="text">
                    Explore analytics on user enagement with your org and posts
                </p>

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
            </div>
        </div>
    )
}
