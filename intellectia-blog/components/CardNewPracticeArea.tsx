'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const CardNew = ({ BlogPosts }: any ) => {
const imageUrl = "https://typescript-blog-backend.onrender.com" + BlogPosts.attributes.PracticeAreaImage.data.attributes.url;
const title = BlogPosts.attributes.title;
const desc = BlogPosts.attributes.Description;
  return (
    
    <div className="card-container">
      
      <div className="card3">
        <Image
            src={imageUrl}
            alt="Card Image"
            width={300}    // must provide width & height
            height={200}
            className="card-image"
          />

        {/* <img
          src={imageUrl}
          alt="Card Image"
          className="card-image"
        /> */}
        <div className="card-content">
          <h2 className="card-title">{title}</h2>
          <p className="card-description font-dm-sans">
            {desc}
          </p>
          <Link href={`/Practices/${BlogPosts.id}`}>
            <button className="card-button">Read More</button>
          </Link>
        </div>
      </div>
          
      <style jsx>{`
        .card-container {
          display: flex;
          justify-content: center;
        
          margin-left: 16px;
        
        }

        .card3 {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          width:250px;
          
          padding: 16px;
          text-align: center;
          max-width: 900px;
          transition: transform 0.3s ease;
        }

        .card:hover {
          transform: scale(1.05);
        }

        .card-image {
          width: 80%;
          height: 30%;
          object-fit: cover;
          padding:40px 20px 20px 20px;
        }

        .card-content {
          padding: 20px;
        }

        .card-title {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 10px;
          color: #666;
        }

        .card-description {
          font-size: 16px;
          margin-bottom: 20px;
          color: #666;
        }

        .card-button {
          padding: 10px 20px;
          font-size: 16px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .card-button:hover {
          background-color: #0056b3;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .card {
            max-width: 100%;
          }

          .card-title {
            font-size: 20px;
          }

          .card-description {
            font-size: 14px;
          }

          .card-button {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
};

export default CardNew;
