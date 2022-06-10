import s from "./style.module.scss";

type Props = { children: React.ReactNode };

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <div className={s.header}>header</div>
      <div className={s.wrapper}>{children}</div>
    </div>
  );
};

export default Layout;
