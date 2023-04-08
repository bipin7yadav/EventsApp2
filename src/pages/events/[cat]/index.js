import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function EventsPerCityPage({ data, pageName }) {
    return (
        <div>
            <h1>Events in {pageName}</h1>
            <div>
                {data.map(e => {
                    return (
                        <Link key={e.id} href={`/events/${e.city}/${e.id}`} passHref>
                            {/* <a> */}
                                <Image src={e.image} width={400} height={400} alt={e.title}/>
                                <h2>{e.title}</h2>
                                <p>{e.description}</p>
                            {/* </a> */}
                        </Link>
                        )
                })}
            </div>
        </div>
    )
}

export default EventsPerCityPage

export async function getStaticPaths() {
    const { events_categories } = await import('/data/data.json');
    const allPaths = events_categories.map((ev) => {
        return {
            params: {
                cat: ev.id.toString(),
            },
        };
    });
    console.log(allPaths);
    return {
        paths: allPaths,
        fallback: false,
    };
}

export async function getStaticProps(context) {
    console.log(context);
    const id = context?.params.cat;
    const { allEvents } = await import('/data/data.json');

    const data = allEvents.filter((ev) => ev.city === id);

    return { props: { data, pageName: id } };
}