function Card({ children, reverse }) {
  return (
    <div
      className='card'
      // too reverse the colour scheme
      style={{
        backgroundColor: reverse ? 'rgba(0,0,0,0.4)' : '#fff',
        color: reverse ? '#fff' : '#000',
      }}
    >
      {children}
    </div>
  );
}
// by default have the reverse set to false
Card.defaultProps = {
  reverse: false,
};

export default Card;
