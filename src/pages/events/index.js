import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

function EventsPage({data}) {
  return (
    <>
      <div>
        <h1>Events Page</h1>
        <div>
        {data?.map((ev) => (
        <Link key={ev.id} href={`/events/${ev.id}`} passHref>
          <div className="card">
            <Image src={ev.image} alt={ev.title} width={500} height={500} /> <h2>{ev.title} </h2>
          </div>
        </Link>
      ))}
        </div>
      </div>
    </>
  )
}

export default EventsPage


export async function getServerSideProps() {
  const { events_categories } = await import('/data/data.json');
  return {
    props: {
      tittle:"Hello Everyone",
      data: events_categories,
    },
  };
}