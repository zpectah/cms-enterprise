import React from 'react';

interface ModuleInstallerProps {
	afterInstall: () => void; // to be reload main form
}

const ModuleInstaller = ({ afterInstall }: ModuleInstallerProps) => {
	return (
		<>
			<div>...ModuleInstaller...</div>
		</>
	);
};

export default ModuleInstaller;
