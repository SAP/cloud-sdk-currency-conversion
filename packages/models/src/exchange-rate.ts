/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { Tenant } from '@sap-cloud-sdk/core/dist/scp-cf/tenant';
import { CurrencyFactor } from './currency-factor';
import { Currency } from './currency-type';
import { ExchangeRateValue } from './exchange-rate-value-type';
import { RateType } from './rate-type';
import { RatesDataProviderCode } from './rates-data-provider-code';
import { RatesDataSource } from './rates-data-source';

export class ExchangeRate {
  private _tenantIdentifier: Tenant | null | undefined;
  private _ratesDataProviderCode: RatesDataProviderCode | null | undefined;
  private _ratesDataSource: RatesDataSource | null | undefined;
  private _exchangeRateType: RateType;
  private _exchangeRateValue: ExchangeRateValue;
  private _fromCurrency: Currency;
  private _toCurrency: Currency;
  private _validFromDateTime: Date;
  private _isIndirect: boolean;
  private _fromCurrencyfactor: CurrencyFactor;
  private _toCurrencyfactor: CurrencyFactor;

  constructor(
    tenantIdentifier: Tenant | null | undefined,
    ratesDataProviderCode: RatesDataProviderCode | null | undefined,
    ratesDataSource: RatesDataSource | null | undefined,
    exchangeRateType: RateType,
    exchangeRateValue: ExchangeRateValue,
    fromCurrency: Currency,
    toCurrency: Currency,
    validFromDateTime: Date,
    isIndirect = false,
    fromCurrencyfactor: CurrencyFactor = new CurrencyFactor(1),
    toCurrencyfactor: CurrencyFactor = new CurrencyFactor(1)
  ) {
    this._tenantIdentifier = tenantIdentifier;
    this._ratesDataProviderCode = ratesDataProviderCode;
    this._ratesDataSource = ratesDataSource;
    this._exchangeRateType = exchangeRateType;
    this._exchangeRateValue = exchangeRateValue;
    this._fromCurrency = fromCurrency;
    this._toCurrency = toCurrency;
    this._validFromDateTime = validFromDateTime;
    this._isIndirect = isIndirect;
    this._fromCurrencyfactor = fromCurrencyfactor;
    this._toCurrencyfactor = toCurrencyfactor;
  }

  get tenantIdentifier(): Tenant | null | undefined {
    return this._tenantIdentifier;
  }

  get ratesDataProviderCode(): RatesDataProviderCode | null | undefined {
    return this._ratesDataProviderCode;
  }

  get ratesDataSource(): RatesDataSource | null | undefined {
    return this._ratesDataSource;
  }

  get exchangeRateType(): RateType {
    return this._exchangeRateType;
  }

  get exchangeRateValue(): ExchangeRateValue {
    return this._exchangeRateValue;
  }

  get fromCurrency(): Currency {
    return this._fromCurrency;
  }

  get toCurrency(): Currency {
    return this._toCurrency;
  }

  get validFromDateTime(): Date {
    return this._validFromDateTime;
  }

  get isIndirect(): boolean {
    return this._isIndirect;
  }

  get fromCurrencyfactor(): CurrencyFactor {
    return this._fromCurrencyfactor;
  }

  get toCurrencyfactor(): CurrencyFactor {
    return this._toCurrencyfactor;
  }
}
