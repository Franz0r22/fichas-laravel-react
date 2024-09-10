import React from 'react';
import { Button, Badge } from 'react-bootstrap';
import styles from './SelectedFilters.module.css'
import { IoClose } from "react-icons/io5";

const SelectedFilters = ({
    selectedBrand,
    selectedModel,
    selectedFuel,
    selectedLabel,
    selectedYearRange,
    selectedPriceRange,
    selectedKmRange,
    minYear,
    maxYear,
    minPrice,
    maxPrice,
    minKm,
    maxKm,
    clearBrand,
    clearModel,
    clearFuel,
    clearLabel,
    clearYearRange,
    clearPriceRange,
    clearKmRange,
    clearAllFilters,
}) => {
    // Verificar si hay algún filtro aplicado
    const anyFilterSelected =
        selectedBrand !== '' ||
        selectedModel !== '' ||
        selectedFuel.length > 0 ||
        selectedLabel.length > 0 ||
        selectedYearRange[0] !== minYear ||
        selectedYearRange[1] !== maxYear ||
        selectedPriceRange[0] !== minPrice ||
        selectedPriceRange[1] !== maxPrice ||
        selectedKmRange[0] !== minKm ||
        selectedKmRange[1] !== maxKm;


    return (
        <>
            {anyFilterSelected && (
                <div className={styles.selectedFilters}>
                    <h6 className={styles.filtersTitle}>Filtros aplicados:</h6>
                    <div className={styles.filtersList}>
                        {selectedBrand && (
                            <div className={styles.filterLabel} onClick={clearBrand} role="button">
                                {selectedBrand}
                                <IoClose className={styles.closeIcon}/>
                            </div>
                        )}
                        {selectedModel && (
                            <div className={styles.filterLabel} onClick={clearModel} role="button">
                                {selectedModel}
                                <IoClose className={styles.closeIcon}/>
                            </div>
                        )}
                        {selectedFuel.length > 0 && (
                            <div className={styles.filterLabel} onClick={clearFuel} role="button">
                                {selectedFuel.join(", ")}
                                <IoClose className={styles.closeIcon}/>
                            </div>
                        )}
                        {selectedLabel.length > 0 && (
                            <div className={styles.filterLabel} onClick={clearLabel} role="button" style={{ textTransform: 'capitalize' }}>
                                {selectedLabel.map(label => label.toLowerCase()).join(", ")}
                                <IoClose className={styles.closeIcon}/>
                            </div>
                        )}
                        {selectedYearRange[0] !== minYear || selectedYearRange[1] !== maxYear ? (
                            <div className={styles.filterLabel} onClick={clearYearRange} role="button">
                                {selectedYearRange[0]} - {selectedYearRange[1]}
                                <IoClose className={styles.closeIcon}/>
                            </div>
                        ) : null}
                        {selectedPriceRange[0] !== minPrice || selectedPriceRange[1] !== maxPrice ? (
                            <div className={styles.filterLabel} onClick={clearPriceRange} role="button">
                                ${selectedPriceRange[0].toLocaleString()} - ${selectedPriceRange[1].toLocaleString()}
                                <IoClose className={styles.closeIcon}/>
                            </div>
                        ) : null}
                        {selectedKmRange[0] !== minKm || selectedKmRange[1] !== maxKm ? (
                            <div className={styles.filterLabel} onClick={clearKmRange} role="button">
                                {selectedKmRange[0].toLocaleString()} Km - {selectedKmRange[1].toLocaleString()} Km
                                <IoClose className={styles.closeIcon}/> 
                            </div>
                        ) : null}
                    </div>

                    <button className={`${styles.clerFiltersBtn} mt-3`} onClick={clearAllFilters}>
                        Limpiar todos los filtros
                    </button>
                </div>
            )}
        </>
    );
};

export default SelectedFilters;
