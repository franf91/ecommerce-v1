import Link from "next/link";

export default async function Page() {
	return (
		<div className="align-text">
			<h1 className="page-title">Shop By Category</h1>
			<div className="category-container">
				<div className="category-card-container">
					<div className="category-card">
						<Link href="/site/[category]" as="/camera">
							<h2 className="category-subtitle">Camera</h2>
							<div className="category-img-container">
								<div className="category-img">
									<img src="/img/camera.jpg" alt="Description of the image" />
								</div>
							</div>
						</Link>
					</div>
				</div>
				<div className="category-card-container">
					<div className="category-card">
						<Link href="/[category]" as="/computer">
							<h2 className="category-subtitle">Computer</h2>
							<div className="category-img-container">
								<div className="category-img">
									<img src="/img/computer.jpg" alt="Description of the image" />
								</div>
							</div>
						</Link>
					</div>
				</div>
				<div className="category-card-container">
					<div className="category-card">
						<Link href="/[category]" as="furniture">
							<h2 className="category-subtitle">Furniture</h2>
							<div className="category-img-container">
								<div className="category-img">
									<img
										src="/img/furniture.jpg"
										alt="Description of the image"
									/>
								</div>
							</div>
						</Link>
					</div>
				</div>
				<div className="category-card-container">
					<div className="category-card">
						<Link href="/[category]" as="exercise">
							<h2 className="category-subtitle">Exercise Equipment</h2>
							<div className="category-img-container">
								<div className="category-img">
									<img src="/img/exercise.jpg" alt="Description of the image" />
								</div>
							</div>
						</Link>
					</div>
				</div>
				<div className="category-card-container">
					<div className="category-card">
						<Link href="/[category]" as="television">
							<h2 className="category-subtitle">Television</h2>
							<div className="category-img-container">
								<div className="category-img">
									<img
										src="/img/television.jpg"
										alt="Description of the image"
									/>
								</div>
							</div>
						</Link>
					</div>
				</div>
				<div className="category-card-container">
					<div className="category-card">
						<Link href="/[category]" as="kitchen">
							<h2 className="category-subtitle">Kitchen</h2>
							<div className="category-img-container">
								<div className="category-img">
									<img src="/img/kitchen.jpg" alt="Description of the image" />
								</div>
							</div>
						</Link>
					</div>
				</div>
				<div className="category-card-container">
					<div className="category-card">
						<Link href="/[category]" as="automotive">
							<h2 className="category-subtitle">Automotive</h2>
							<div className="category-img-container">
								<div className="category-img">
									<img
										src="/img/automotive.jpg"
										alt="Description of the image"
									/>
								</div>
							</div>
						</Link>
					</div>
				</div>
				<div className="category-card-container">
					<div className="category-card">
						<Link href="/[category]" as="travel">
							<h2 className="category-subtitle">Travel</h2>
							<div className="category-img-container">
								<div className="category-img">
									<img src="/img/travel.jpg" alt="Description of the image" />
								</div>
							</div>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
