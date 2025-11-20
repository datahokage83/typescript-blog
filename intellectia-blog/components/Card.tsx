import React from 'react';
import Image from "next/image";


const Card = ({ teamMember }: any  ) => {
    const imageUrl = "https://typescript-blog-backend.onrender.com" + teamMember.attributes.TeamMemberPhoto.data.attributes.url;
    return (
        <div className="card">
            {/* <img src={imageUrl} alt={`${teamMember.attributes.name}'s photo`} className="card-photo" /> */}
            <Image
                src={imageUrl}
                alt={`${teamMember.attributes.TeamMemberName}'s photo`}
                width={400}              // required
                height={300}             // required
                className="card-photo object-cover w-full h-full"
                />
            <h2 className="card-name">{teamMember.attributes.TeamMemberName}</h2>
            <p className="card-designation">{teamMember.attributes.TeamMemberDesignation}</p>
            <p className="card-email">{teamMember.attributes.TeamMemberEmail}</p>
            <p className="card-phone">{teamMember.attributes.TeamMemberNumber}</p>
        </div>
    );
};
export default Card;