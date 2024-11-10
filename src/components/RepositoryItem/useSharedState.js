// useSharedState.js
import { useState } from 'react';

const useSharedId = () => {

    const [selectedId, setSelectedId] = useState();

    return [selectedId, setSelectedId];
};

export default useSharedId;
