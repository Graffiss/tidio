export interface PersonInfoType {
  id: string;
  firstNameLastName: string;
  jobTitle: string;
  emailAddress: string;
}

export type Props = {
  data: PersonInfoType;
  onClick: () => void;
  className?: string;
};

function PersonInfo(props: Props) {
  const { data, onClick, className } = props;
  return (
    <div
      style={{
        display: "flex",
        height: "100px",
        justifyContent: "center",
        flexDirection: "column",
        padding: "32px",
        boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.15)",
        margin: "10px 0",
        background: "#fff",
        cursor: "pointer",
        width: "350px",
      }}
      className={`person-info ${className && className}`}
      onClick={onClick}
    >
      <div className="firstNameLastName">{data.firstNameLastName}</div>
      <div className="jobTitle">{data.jobTitle}</div>
      <div className="emailAddress">{data.emailAddress}</div>
    </div>
  );
}

export default PersonInfo;
