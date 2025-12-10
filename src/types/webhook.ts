export interface TaxonomyValue {
	id: string;
	name: string;
}

export interface Taxonomy {
	id: string;
	name: string;
	values: TaxonomyValue[];
}

export interface Classification {
	type: 'categories';
	value: string;
	taxonomy: string;
}
