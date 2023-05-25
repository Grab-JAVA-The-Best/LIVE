const AlarmCardContent = ({ image, writer, date, time, content }) => {
  return (
    <>
      <td>{writer}</td>
      <td>{date}</td>
      <td>{time}</td>
      <td>{content}</td>
    </>
  );
};

export default AlarmCardContent;
