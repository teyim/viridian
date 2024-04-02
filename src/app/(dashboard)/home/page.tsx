"use client";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";

const Home = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/user-activity/"
        );

        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        setError(error.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Clean-up function (optional)
    return () => {
      // Perform any clean-up if needed
    };
  }, []); // Empty dependency array ensures effect only runs once after initial render

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {/* Render your fetched data here */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Home;
