import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser, DetailedGithubUser } from '../api/API';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<string[]>([]);
  const [currentCandidate, setCurrentCandidate] = useState<DetailedGithubUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      setLoading(true);
      const result = await searchGithub();
      setCandidates(result.map(user => user.login));
      setLoading(false);
    };
    fetchCandidates();
  }, []);

  useEffect(() => {
    const fetchCandidateDetails = async () => {
      if (candidates.length > 0) {
        try {
          const candidateDetails = await searchGithubUser(candidates[0]);
          setCurrentCandidate(candidateDetails);
        } catch (err) {
          setError('Failed to fetch candidate details');
        }
      } else {
        setCurrentCandidate(null);
      }
    };
    fetchCandidateDetails();
  }, [candidates]);

  const saveCandidate = () => {
    if (currentCandidate) {
      const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
      savedCandidates.push(currentCandidate);
      localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
    }
    setCandidates((prev) => prev.slice(1));
  };

  const skipCandidate = () => {
    setCandidates((prev) => prev.slice(1));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!currentCandidate) return <div>No more candidates available</div>;

  return (
    <div>
      <h1>Candidate Search</h1>
      <div>
        <img src={currentCandidate.avatar_url} alt={`${currentCandidate.login}'s avatar`} />
        <h2>{currentCandidate.name || currentCandidate.login}</h2>
        <p>Username: {currentCandidate.login}</p>
        <p>Location: {currentCandidate.location || 'N/A'}</p>
        <p>Company: {currentCandidate.company || 'N/A'}</p>
        <p>Email: {currentCandidate.email || 'N/A'}</p>
        <a href={currentCandidate.html_url} target="_blank" rel="noopener noreferrer">GitHub Profile</a>
      </div>
      <button onClick={saveCandidate}>+</button>
      <button onClick={skipCandidate}>-</button>
    </div>
  );
};

export default CandidateSearch;
