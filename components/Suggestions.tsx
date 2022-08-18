import React, {useEffect, useState} from 'react';
import { faker } from '@faker-js/faker';

const Suggestions = () => {
    const [suggestions, setSuggestions]:any = useState([])

    useEffect(() => {
        const suggestions = [...Array(5)].map((_,i)=> ({
                id: i,
                name: faker.name.firstName(),
                username: faker.internet.userName(),
                avatar: faker.internet.avatar(),
                email: faker.internet.email(),
                dob: faker.date.birthdate(),
                phone: faker.phone.number(),
                address: {
                    street: faker.address.streetAddress(false),
                    suite: faker.address.secondaryAddress(),
                    city: faker.address.city(),
                    zipcode: faker.address.zipCode(),
                    state: faker.address.state(),
                    geo: faker.address.nearbyGPSCoordinate()
                },
                website: faker.internet.domainName(),
                company: {
                    name: faker.company.companyName(),
                    catchPhrase: faker.company.catchPhraseNoun(),
                    bs: faker.company.bs()
                }
            }
        ))
        setSuggestions(suggestions)
    }, [])


    return (
        <div className='mt-8 ml-10'>
            <div className='flex justify-between text-sm mb-5'>
                <h3 className='text-sm font-bold text-gray-400'>Suggestions for you</h3>
                <button className='text-gray-600 font-semibold'>See All</button>
            </div>

            {
                suggestions.map((profile:any) => (
                    <div key={profile.id} className='flex items-center justify-between mt-3'>
                        <img className='w-10 h-10 rounded-full border p-[2px]' src={profile.avatar} alt=""/>

                        <div className='flex-1 ml-4'>
                            <h2 className='font-semibold text-sm'>{profile.username}</h2>
                            <h3 className='text-xs text-gray-400'>{profile.company.name}</h3>
                        </div>
                        <button className='text-blue-400 text-xs font-bold'>Follow</button>
                    </div>
                ))
            }
        </div>
    );
}

export default Suggestions;