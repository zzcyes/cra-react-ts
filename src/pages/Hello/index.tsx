import styled from 'styled-components';

const Hello = () => {
  return (
    <HelloWrap>
      {Array.from({ length: 200 }, (x, index) => index + 1).map(item => (
        <Card>{item}</Card>
      ))}
    </HelloWrap>
  );
};

export default Hello;

const HelloWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 8px;
  width: 100%;
`;

const Card = styled.div`
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  border-radius: 8px;
  border: 1px solid gainsboro;
`;
