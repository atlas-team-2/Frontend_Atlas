import { useParams } from 'react-router-dom';

function PeopleProfilePage() {
  const { peopleId } = useParams();
  return <div>Народ: {peopleId}</div>;
}

export default PeopleProfilePage;
