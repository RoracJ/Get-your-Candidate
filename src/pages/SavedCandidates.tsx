import { useState, useEffect } from "react";
import { DetailedGithubUser } from "../api/API";

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<DetailedGithubUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedCandidates = () => {
      setLoading(true);
      const candidates = localStorage.getItem('savedCandidates');
      if (candidates) {
        setSavedCandidates(JSON.parse(candidates));
      }
      setLoading(false);
    };
    fetchSavedCandidates();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (savedCandidates.length === 0) return <div>No candidates have been accepted</div>;

  return (
    <>
      <h1>Potential Candidates</h1>
      <div>
        {savedCandidates.map((candidate) => (
          <div key={candidate.id} style={{ border: '1px solid #ddd', padding: '10px', margin: '10px 0' }}>
            <img src={candidate.avatar_url} alt={`${candidate.login}'s avatar`} style={{ width: '50px', height: '50px' }} />
            <h2>{candidate.name || candidate.login}</h2>
            <p>Username: {candidate.login}</p>
            <p>Location: {candidate.location || 'N/A'}</p>
            <p>Company: {candidate.company || 'N/A'}</p>
            <p>Email: {candidate.email || 'N/A'}</p>
            <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">GitHub Profile</a>
          </div>
        ))}
      </div>
    </>
  );
};

export default SavedCandidates;
