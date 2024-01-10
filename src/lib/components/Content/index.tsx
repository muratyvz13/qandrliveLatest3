import MobileMenu from '../MobileMenu';
import Partners from '../Partners';
import Header  from "../Header";
import Footer  from "../Footer";

interface Props{
  children:React.ReactNode
}

export const Content = ({children}:Props) => {


    return(<>
      <Header/>
      {children}
      <Partners/>
      <Footer/>
    </>)
}

export default Content;
