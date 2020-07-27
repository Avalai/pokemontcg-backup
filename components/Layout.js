import NextHead from '../components/Head'
import Footer from '../components/Footer'

export default function Layout(props) {
    return (
        <>
            <NextHead />

            {props.children}

            <Footer />
        </>
    )
}