class Water {
	constructor() {
		// size
		this.height = 200;
		this.width = width;

		// position
		this.x = 0;
		this.y = height - this.height;
	}

	display() {
		rect(this.x, this.y, this.width, this.height);
	}

	// Expect a object with a location vector attribute
	contains(obj) {
		if(obj.location) {
			let loc = obj.location;
			if(
				loc.x > this.x && loc.x < this.x + this.width && 
				loc.y > this.y && loc.y < this.y + this.height
				) {
					return true;
				}
		}

		return false;
	}
}