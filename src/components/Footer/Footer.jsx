import './Footer.css'


function Footer() {

    return (
        <>
			<footer>
				<div className="container">
					<div className="logo">
						<img src="/marvelLogo.svg" alt="Marvel Logo" />
					</div>
                    <p className='policy'>Data provided by Marvel. ©2025 MARVEL</p>
                    <a className='devLink' href="https://developer.marvel.com/" target="_blank" rel="noopener noreferrer">developer.marvel.com</a>
				</div>
			</footer>
		</>
	)

}
export default Footer;