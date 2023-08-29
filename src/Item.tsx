type Props = {
  children: JSX.Element | JSX.Element[];
  label: string;
};

const Item = ({ children, label }: Props) => (
  <div className="item">
    <h6 className="item-label">{label}:</h6>
    {children}
  </div>
);

export default Item;
