import Items from '../components/items';

const Home = props => (
  <div>
    <Items page={props.query.page} />
  </div>
);

export default Home;
