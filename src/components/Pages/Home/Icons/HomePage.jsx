import '../home.css'
import { AnyChar } from './AnyChar'
import { AnyCom } from './AnyCom'
import { AnyFavor } from './AnyFavor'
import { AnySer } from './AnySer'
import { AnyTheme } from './AnyTheme'
import { ShowChars } from './ShowChars'


export const Discription = () => {
	return (
		<>
			<div className="container">
				<div className="disc">
					<div className="title">
						<h1 className="title-title">All Marvel characters</h1>
						<p className="disc-text">
							You can find any series, character or comic from the
							marvel universe
						</p>
					</div>
					<div className="functions">
						<div className="card">
							<div className="icon-bg">
								<div className="icon">
									<AnyChar/>
								</div>
							</div>
							<h2 className="card__title">Any characters</h2>
							<p className="disc-text">
								Fingerstache flexitarian street art 8-bit waist
								co, subway tile poke farm.
							</p>
						</div>
						<div className="card">
							<div className="icon-bg">
								<div className="icon">
									<AnyCom/>
								</div>
							</div>
							<h2 className="card__title">Any comics</h2>
							<p className="disc-text">
								Fingerstache flexitarian street art 8-bit waist
								co, subway tile poke farm.
							</p>
						</div>
						<div className="card">
							<div className="icon-bg">
								<div className="icon">
									<AnySer/>
								</div>
							</div>
							<h2 className="card__title">Any series</h2>
							<p className="disc-text">
								Fingerstache flexitarian street art 8-bit waist
								co, subway tile poke farm.
							</p>
						</div>
						<div className="card">
							<div className="icon-bg">
								<div className="icon">
									<ShowChars/>
								</div>
							</div>
							<h2 className="card__title">
								Shows characters from comics/series
							</h2>
							<p className="disc-text">
								Fingerstache flexitarian street art 8-bit waist
								co, subway tile poke farm.
							</p>
						</div>
						<div className="card">
							<div className="icon-bg">
								<div className="icon">
									<AnyTheme/>
								</div>
							</div>
							<h2 className="card__title">Dark theme</h2>
							<p className="disc-text">
								Fingerstache flexitarian street art 8-bit waist
								co, subway tile poke farm.
							</p>
						</div>
						<div className="card">
							<div className="icon-bg">
								<div className="icon">
									<AnyFavor/>
								</div>
							</div>
							<h2 className="card__title">
								Ability to add to favorites
							</h2>
							<p className="disc-text">
								Fingerstache flexitarian street art 8-bit waist
								co, subway tile poke farm.
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
export default Discription